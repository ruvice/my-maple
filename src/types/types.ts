import { MapleServer, Ocid } from "@ruvice/my-maple-models";
import { ServerCharacters } from "../store/characterStore";
import { useQueryClient } from "@tanstack/react-query";

export type TwitchBroadcasterConfiguration = {
    [MapleServer.KMS]: TwitchCharacters;
    [MapleServer.SEA]: TwitchCharacters;
    [MapleServer.TMS]: TwitchCharacters;
}

export type TwitchCharacters = Record<string, Ocid>;

export interface CachedCharacterData {
    characters: ServerCharacters;
    expiry: number
}

export type LoadCharacterRequest = {
    configuration?: TwitchBroadcasterConfiguration,
    queryClient: ReturnType<typeof useQueryClient>
}