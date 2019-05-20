import { MemorialRecord } from "./memorial-record.model";

export interface MemorialRecords {
    memorialCollectionId: string,
    memorialCollection: MemorialRecord[]
}