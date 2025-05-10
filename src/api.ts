import axios from "axios"
import { Ocid, OpenAPIStatResponse, OpenAPICharacterBasicResponse, OpenAPIItemEquipmentResponse, OpenAPIOcidQueryResponse, OpenAPISymbolEquipmentResponse } from "./types/types"
import { getAPIDate, getAPIDateForXDaysAgo } from "./utils/utils"

const domain = 'https://your-vercel-project.vercel.app/api/nexonProxy';

const OCID_PATH = "maplestorysea/v1/id";
const BASIC_PATH = "maplestorysea/v1/character/basic";
const ITEM_PATH = "maplestorysea/v1/character/item-equipment";
const SYMBOL_PATH = "maplestorysea/v1/character/symbol-equipment";
const STAT_PATH = "maplestorysea/v1/character/stat";

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

export const fetchCharacterOCID = async (characterName: string) => getFromProxy<OpenAPIOcidQueryResponse>({'path': OCID_PATH, "character_name": characterName});
export const fetchCharacterBasic = async (ocid: Ocid) => getFromProxy<OpenAPICharacterBasicResponse>({'path': BASIC_PATH, "ocid": ocid, "date": getAPIDate()});
export const fetchCharacterItemEquip = async (ocid: Ocid) => getFromProxy<OpenAPIItemEquipmentResponse>({'path': ITEM_PATH, "ocid": ocid, "date": getAPIDate()});
export const fetchCharacterSymbol = async (ocid: Ocid) => getFromProxy<OpenAPISymbolEquipmentResponse>({'path': SYMBOL_PATH, "ocid": ocid, "date": getAPIDate()});
export const fetchCharacterEXP = async (ocid: Ocid, offset: number) => 
    getFromProxy<OpenAPICharacterBasicResponse>({'path': BASIC_PATH, "ocid": ocid, "date": getAPIDateForXDaysAgo(offset)});
export const fetchCharacterStat = async (ocid: Ocid) => getFromProxy<OpenAPIStatResponse>({'path': STAT_PATH, "ocid": ocid, "date": getAPIDate()});

