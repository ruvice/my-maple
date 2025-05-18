import axios from "axios"
import { OpenAPIOcidQueryResponse, Character, MapleServer } from "@ruvice/my-maple-models"
import { saveCharacterData, updateValidServers } from "./utils/utils"
import { CachedCharacterData, LoadCharacterRequest } from "./types/types";
import { useTwitchStore } from "./store/twitchStore";
import { useCharacterStore } from "./store/characterStore";
import { useViewStore } from "./store/useCharacterViewStore";

const domain = 'https://my-maple-proxy-2.vercel.app/api/nexonProxy';
const batchFetchDomain = 'https://my-maple-proxy-2.vercel.app/api/batchFetch';

// const domain = 'http://localhost:3000/api/nexonProxy';
// const batchFetchDomain = 'http://localhost:3000/api/batchFetch'
const OCID_PATH = "v1/id";

const setCharacter = useCharacterStore.getState().setCharacter;
const getServerCharacters = useCharacterStore.getState().getServerCharacters;
const setCurrentServer = useViewStore.getState().setCurrentServer;
const getCurrentServer = useViewStore.getState().getCurrentServer;


export const fetchCharacter = async(characterName: string, server: MapleServer) => batchFetchFromProxy<Character>({"character_name": characterName, "server": server});
export const fetchCharacterOCID = async (characterName: string, server: MapleServer) => getFromProxy<OpenAPIOcidQueryResponse>({'path': OCID_PATH, "character_name": characterName, "server": server});

const getFromProxy = async <T>(params: Record<string, string>) => {
    try {
      const res = await axios.get<T>(domain, { params });
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new Error(err.response?.data?.error.message || `API error - ${err.response?.status}: ${err.response?.data?.error.name}`);
      }
      throw err;
    }
};

const batchFetchFromProxy = async <T>(params: Record<string, string>) => {
    try {
      const res = await axios.get<T>(batchFetchDomain, { params });
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new Error(err.response?.data?.error.message || `API error - ${err.response?.status}: ${err.response?.data?.error.name}`);
      }
      throw err;
    }
};


export const loadCharacters = async(
    request: LoadCharacterRequest
) => {
    const { queryClient } = request
    const configuration = request.configuration ?? useTwitchStore.getState().getConfiguration();
    for (const serverKey of Object.keys(configuration)) {
        const server = serverKey as MapleServer;
        for (const characterName of Object.keys(configuration[server])) {
            const charRes = await queryClient.fetchQuery<Character>({
                queryKey: ['character', characterName],
                queryFn: () => fetchCharacter(characterName, server),
            });
            setCharacter(characterName, server, charRes);
        }
    }

    // Setting servers
    const fetchedCharacters = getServerCharacters();
    const currentServer = getCurrentServer();
    if (Object.keys(currentServer).length === 0) {
        if (Object.keys(fetchedCharacters.KMS).length !== 0) {
            setCurrentServer(MapleServer.KMS);
        } else if (Object.keys(fetchedCharacters.SEA).length !== 0) {
            setCurrentServer(MapleServer.SEA);
        }
    }
    updateValidServers()
    
    
    const now = Date.now()
    const cache: CachedCharacterData = {
        characters: fetchedCharacters,
        expiry: now + 20 * 60 * 1000
    }
    console.log('Caching latest character info')
    saveCharacterData(cache)
}
