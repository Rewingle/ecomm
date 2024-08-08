export const categories = [
    {name: "Tshirt", sku: "TST"},
    {name: "Shirt", sku: "SHT"},
    {name: "Pants", sku: "PNT"},
    {name: "Shoes", sku: "SHS"},
    {name: "Hoodie", sku: "HDI"},
    {name: "Jacket", sku: "JKT"},
    {name: "Shorts", sku: "SRT"},
    {name: "Sweater", sku: "SWT"},
    {name: "Socks", sku: "SKS"},
    {name: "Underwear", sku: "UWD"},
    {name: "Accessories", sku: "ACC"},
    {name: "Other", sku: "OTH"},
] as const

export const categoryNames = [
    "Tshirt",
    "Shirt",
    "Pants",
    "Shoes",
    "Hoodie",
    "Jacket",
    "Shorts",
    "Sweater",
    "Socks",
    "Underwear",
    "Accessories",
    "Other",
] as const

export const colors = [
    {name: "Black", sku: "BLK"},
    {name: "White", sku: "WHT"},
    {name: "Red", sku: "RED"},
    {name: "Blue", sku: "BLU"},
    {name: "Green", sku: "GRN"},
    {name: "Yellow", sku: "YEL"},
    {name: "Orange", sku: "ORG"},
    {name: "Purple", sku: "PUR"},
    {name: "Pink", sku: "PNK"},
    {name: "Brown", sku: "BRN"},
    {name: "Grey", sku: "GRY"},
    {name: "Beige", sku: "BEI"},
    {name: "Mixed", sku: "MIX"},
] as const

export type actionResponseType = {
    success: boolean
    message: string,
    data?: any | null
}