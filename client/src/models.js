export class MainBuild {
    constructor(id, computer_name) {
        this.computer_name = computer_name;
        this.id = id;
        this.processor = null;
        this.ram_type = null;
    }
}

export class Processor {
    constructor(id, processor_name, processor_price) {
        this.id = id;
        this.processor_name = processor_name;
        this.processor_price = processor_price;
    }
}

export class RAMType {
    constructor(id, ram_name, ram_price) {
        this.id = id;
        this.ram_name = ram_name;
        this.ram_price = ram_price;
    }
}