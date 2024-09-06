import { Accommodation } from "./accomodation";
export type Resort = {
    id: number;
    name: string;
};
export type Query = {
    ski_site: Resort["id"];
    group_size: number;
    from_date: string;
    to_date: string;
};
export interface QueryResponse {
    statusCode: number;
    body: Body;
}
export interface Body {
    success: string;
    accommodations: Accommodation[];
}
