export interface Accommodation {
    HotelCode: string;
    HotelName: string;
    HotelDescriptiveContent: HotelDescriptiveContent;
    HotelInfo: HotelInfo;
    PricesInfo: PricesInfo;
}
export interface HotelDescriptiveContent {
    Images: Image[];
}
export interface Image {
    MainImage?: string;
    URL: string;
}
export interface HotelInfo {
    Position: Position;
    Rating: string;
    Beds: string;
}
export interface Position {
    Latitude: string;
    Longitude: string;
    Distances: Distance[];
}
export interface Distance {
    type: string;
    distance: string;
}
export interface PricesInfo {
    AmountAfterTax: string;
    AmountBeforeTax: string;
}
