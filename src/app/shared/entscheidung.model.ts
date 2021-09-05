export interface Entscheidung {
    id: string;
    art: EntscheidungArt,
    param1: string;
    param2: boolean;
}

export enum EntscheidungArt {
    keine = 'keine',
    abbrechen = 'Abbrechen',
    kanzleiauftrg = 'Kanzleiauftrag',
}