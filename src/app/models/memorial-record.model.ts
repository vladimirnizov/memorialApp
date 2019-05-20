import { Munzah } from "./munzah.model";
import { Manziah } from "./manziah.model";
import { PendingData } from "./pending-data.model";

export interface MemorialRecord {
    munzah: Munzah,
    manziah: Manziah,
    othersManziah?: Manziah[]
    pendingData?: PendingData[]
}