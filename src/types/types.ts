import { Character, Ocid } from "@ruvice/my-maple-models";
import { Characters } from "../store/characterStore";
import { useQueryClient } from "@tanstack/react-query";

export type TwitchBroadcasterConfiguration = Record<string, Ocid>
export interface CachedCharacterData {
    characters: Characters;
    expiry: number
}

export type LoadCharacterRequest = {
    configuration?: TwitchBroadcasterConfiguration,
    queryClient: ReturnType<typeof useQueryClient>
}