import axios from "axios"
import { Ocid, OpenAPIStatResponse, OpenAPICharacterBasicResponse, OpenAPIItemEquipmentResponse, OpenAPIOcidQueryResponse, OpenAPISymbolEquipmentResponse, Character } from "@ruvice/my-maple-models"
import { getAPIDate, getAPIDateForXDaysAgo, saveCharacterData } from "./utils/utils"
import { CachedCharacterData, LoadCharacterRequest } from "./types/types";
import { useTwitchStore } from "./store/twitchStore";
import { useCharacterStore } from "./store/characterStore";

const domain = 'https://my-maple-proxy.vercel.app/api/nexonProxy';
// const batchFetchDomain = 'https://my-maple-proxy.vercel.app/api/batchFetch';
const batchFetchDomain = ' http://localhost:3000/api/batchFetch';

const OCID_PATH = "maplestorysea/v1/id";


export const fetchCharacter = async(characterName: string) => batchFetchFromProxy<Character>({"character_name": characterName});
export const fetchCharacterOCID = async (characterName: string) => getFromProxy<OpenAPIOcidQueryResponse>({'path': OCID_PATH, "character_name": characterName});


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
) => {{
    const { queryClient } = request
    const setCharacter = useCharacterStore.getState().setCharacter;
    const getCharacters = useCharacterStore.getState().getCharacters;
    
    const configuration = request.configuration ?? useTwitchStore.getState().getConfiguration();
    for (const characterName of Object.keys(configuration)) {
        const charRes = await queryClient.fetchQuery<Character>({
            queryKey: ['character', characterName],
            queryFn: () => fetchCharacter(characterName),
        });
        setCharacter(characterName, charRes);
    }
    const fetchedCharacters = getCharacters()
    const now = Date.now()
    const cache: CachedCharacterData = {
        characters: fetchedCharacters,
        expiry: now + 20 * 60 * 1000
    }
    console.log('Caching latest character info')
    saveCharacterData(cache)
}}
