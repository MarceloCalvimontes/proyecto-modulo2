export interface Guitar { 
    guitars: Guitar[];
}

export interface Guitar {
    id: number;
    brand: string;
    model: string;
    year: number;
    price: number;
    pickup_configuration: string;
}

export enum PickupConfiguration {
    HH = 'HH',
    HSS = 'HSS',
    P90 = 'P90',
    HSH = 'HSH',
    SSS = 'SSS'
}