import axios from "axios"
import { Ocid, OpenAPICharacterBasicResponse, OpenAPIItemEquipmentResponse, OpenAPIOcidQueryResponse, OpenAPISymbolEquipmentResponse } from "../types/types"
import { getAPIDate, getAPIDateForXDaysAgo } from "../utils/utils"

const openAPIDomain = process.env.REACT_APP_OPEN_API_DOMAIN

export const fetchCharacterOCID = async (characterName: string) => {
    const url = openAPIDomain + "/maplestorysea/v1/id"
    return axios.get<OpenAPIOcidQueryResponse>(url, {
        headers: {
            "x-nxopen-api-key": process.env.REACT_APP_OPEN_API_KEY
        },
        params: {
            "character_name": characterName
        }
    }).then((res) => res.data)
}

export const fetchCharacterBasic = async (ocid: Ocid) => {
    const url = openAPIDomain + "/maplestorysea/v1/character/basic"
    return axios.get<OpenAPICharacterBasicResponse>(url, {
        headers: {
            "x-nxopen-api-key": process.env.REACT_APP_OPEN_API_KEY
        },
        params: {
            "date": getAPIDate(),
            "ocid": ocid
        }
    }).then((res) => res.data)
}

export const fetchCharacterItemEquip = async (ocid: Ocid) => {
    const url = openAPIDomain + "/maplestorysea/v1/character/item-equipment"
    return axios.get<OpenAPIItemEquipmentResponse>(url, {
        headers: {
            "x-nxopen-api-key": process.env.REACT_APP_OPEN_API_KEY
        },
        params: {
            "date": getAPIDate(),
            "ocid": ocid
        }
    }).then((res) => res.data)
}

export const fetchCharacterSymbol = async (ocid: Ocid) => {
    const url = openAPIDomain + "/maplestorysea/v1/character/symbol-equipment"
    return axios.get<OpenAPISymbolEquipmentResponse>(url, {
        headers: {
            "x-nxopen-api-key": process.env.REACT_APP_OPEN_API_KEY
        },
        params: {
            "date": getAPIDate(),
            "ocid": ocid
        }
    }).then((res) => res.data) 
}


export const fetchCharacterEXP = async (ocid: Ocid, offset: number) => {
    const url = openAPIDomain + "/maplestorysea/v1/character/basic"
    return axios.get<OpenAPICharacterBasicResponse>(url, {
        headers: {
            "x-nxopen-api-key": process.env.REACT_APP_OPEN_API_KEY
        },
        params: {
            "date": getAPIDateForXDaysAgo(offset),
            "ocid": ocid
        }
    }).then((res) => res.data)
}
