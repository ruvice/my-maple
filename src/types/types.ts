// types.ts

import { Equipment, EquipmentTitleModel, Symbol } from "./equipmentTypes";

// For Open API queries and state management
export type Ocid = string;

export interface CharacterMap {
  [ocid: string]: string;
}

export interface OpenAPIOcidQueryResponse {
    ocid: string
}

export interface OpenAPICharacterBasicResponse {
    date: string
    character_name: string;
    world_name: string;
    character_gender: string;
    character_class: string;
    character_class_level: string;
    character_level: number;    
    character_exp: number;    
    character_exp_rate: string;
    character_guild_name: string;
    character_image: string;
    character_date_create: string;
    access_flag: string;
    liberation_quest_clear_flag: string
}

// Character model
// Alias for readability
export type BasicCharacterInfo = OpenAPICharacterBasicResponse
export type ProxyCharacterResponse = Character
export interface Character {
    name: string;
    ocid: Ocid;
    basic?: BasicCharacterInfo; 
    isLoading?: boolean;
    error?: string;
    equips?: ItemEquipInfo;
    symbol?: SymbolInfo;
    expProgression?: ExpData[];
    stat?: StatInfo;
}

export interface ExpData {
    date: string;
    exp: number;
    exp_rate: string
}

// Equipment model
// Alias for readability
export type ItemEquipInfo = OpenAPIItemEquipmentResponse
export interface OpenAPIItemEquipmentResponse {
    date: string;
    character_gender: string;
    character_class: string;
    preset_no: number;
    item_equipment: Equipment[];
    item_equipment_preset_1: Equipment[];
    item_equipment_preset_2: Equipment[];
    item_equipment_preset_3: Equipment[];
    title: EquipmentTitleModel;
    dragon_equipment: Equipment[];
    mechanic_equipment: Equipment[]
}

export type SymbolInfo = OpenAPISymbolEquipmentResponse
export interface OpenAPISymbolEquipmentResponse {
    date: string;
    character_class: string;
    symbol: Symbol[]
}

export type StatInfo = OpenAPIStatResponse
export interface OpenAPIStatResponse {
    date: string;
    character_class: string;
    final_stat: Stat[];
    remain_ap: number
}

export interface Stat {
    stat_name: string;
    stat_value: string
}

export type TwitchBroadcasterConfiguration = Record<string, Ocid>