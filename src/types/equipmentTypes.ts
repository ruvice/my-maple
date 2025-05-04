// equipmentTypes.ts
export interface Equipment {
    item_equipment_part: string,
    item_equipment_slot: string,
    item_name: string,
    item_icon: string,
    item_description: null,
    item_shape_name: string,
    item_shape_icon: string,
    item_gender: null,
    item_total_option: ItemTotalOption,
    item_base_option: ItemBaseOption,
    potential_option_grade: string,
    additional_potential_option_grade: string,
    potential_option_flag: string,
    potential_option_1: string,
    potential_option_2: string,
    potential_option_3: string,
    additional_potential_option_flag: string,
    additional_potential_option_1: string,
    additional_potential_option_2: string,
    additional_potential_option_3: string,
    equipment_level_increase: number,
    item_exceptional_option: ItemExceptionalOption,
    item_add_option: ItemAddOption,
    growth_exp: number,
    growth_level: number,
    scroll_upgrade: string,
    cuttable_count: string,
    golden_hammer_flag: string,
    scroll_resilience_count: string,
    scroll_upgradeable_count: string,
    soul_name: string,
    soul_option: string,
    item_etc_option: ItemEtcOption,
    starforce: string,
    starforce_scroll_flag: string,
    item_starforce_option: ItemStarForceOption,
    special_ring_level: number,
    date_expire: null
}

export interface ItemTotalOption {
    [key: string]: string|number; // ✅ allows dynamic access like totalOptions[statKey]
    str: string;
    dex: string;
    int: string;
    luk: string;
    max_hp: string;
    max_mp: string;
    attack_power: string;
    magic_power: string;
    armor: string;
    speed: string;
    jump: string;
    boss_damage: string;
    ignore_monster_armor: string;
    all_stat: string;
    damage: string;
    equipment_level_decrease: number;
    max_hp_rate: string;
    max_mp_rate: string;
}


export interface ItemBaseOption {
    [key: string]: string|number; // ✅ allows dynamic access like totalOptions[statKey]
    str: string;
    dex: string;
    int: string;
    luk: string;
    max_hp: string;
    max_mp: string;
    attack_power: string;
    magic_power: string;
    armor: string;
    speed: string;
    jump: string;
    boss_damage: string;
    ignore_monster_armor: string;
    all_stat: string;
    max_hp_rate: string;
    max_mp_rate: string;
    base_equipment_level: number;
}

export interface ItemExceptionalOption {
    [key: string]: string|number; // ✅ allows dynamic access like totalOptions[statKey]
    str: string;
    dex: string;
    int: string;
    luk: string;
    max_hp: string;
    max_mp: string;
    attack_power: string;
    magic_power: string;
    exceptional_upgrade: number;
}

export interface ItemAddOption {
    [key: string]: string|number; // ✅ allows dynamic access like totalOptions[statKey]
    str: string;
    dex: string;
    int: string;
    luk: string;
    max_hp: string;
    max_mp: string;
    attack_power: string;
    magic_power: string;
    armor: string;
    speed: string;
    jump: string;
    boss_damage: string;
    damage: string;
    all_stat: string;
    equipment_level_decrease: number;
}


export interface ItemEtcOption {
    [key: string]: string|number; // ✅ allows dynamic access like totalOptions[statKey]
    str: string,
    dex: string,
    int: string,
    luk: string,
    max_hp: string,
    max_mp: string,
    attack_power: string,
    magic_power: string,
    armor: string,
    speed: string,
    jump: string
}

export interface ItemStarForceOption {
    [key: string]: string; // ✅ allows dynamic access like totalOptions[statKey]
    str: string;
    dex: string;
    int: string;
    luk: string;
    max_hp: string;
    max_mp: string;
    attack_power: string;
    magic_power: string;
    armor: string;
    speed: string;
    jump: string;
}

export interface EquipmentTitleModel {
    title_name: string,
    title_icon: string,
    title_description: string,
    date_expire: string,
    date_option_expire: string
}

export interface Symbol {
    symbol_name: string,
    symbol_icon: string,
    symbol_description: string,
    symbol_force: string,
    symbol_level: number,
    symbol_str: string,
    symbol_dex: string,
    symbol_int: string,
    symbol_luk: string,
    symbol_hp: string,
    symbol_drop_rate: string,
    symbol_meso_rate: string,
    symbol_exp_rate: string,
    symbol_growth_count: number,
    symbol_require_growth_count: number
}