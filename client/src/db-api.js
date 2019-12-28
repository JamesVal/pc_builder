import axios from 'axios';
import { Observable, of, from } from 'rxjs';
import { pipe, concatMap, concatAll } from 'rxjs/operators';

import { MainBuild, Processor, RAMType } from './models.js';

export default class DBApi {
    static getAllBuilds() {
        let _build_ids = [];
        let _buildData = [];

        return new Observable((observer) => {
            axios.get("/parts_api/get_all_builds").then((result) => {
                for (let i = 0; i < result.data.length; i++) {
                    _build_ids.push(result.data[i].id)
                }
                from(_build_ids).pipe(
                    concatMap((x) => {return this.getComputerData(x);})
                ).subscribe({
                    next(x) {
                        observer.next(x);
                    },
                    complete() {
                        observer.complete();
                    },
                    error(e) {
                        observer.error(e);
                    }
                });
            });
        });
    }

    static getComputerData(build_id) {
        let _mainBuild;
        let _curBuild;

        return new Observable((observer) => {
            this.getBuildById(build_id).pipe(
                concatMap((x) => {
                    _curBuild = x;
                    console.log("build:", x);
                    _mainBuild = new MainBuild(x.id, x.computer_name);
                    return this.getProcessorById(_curBuild.processor);
                }),
                concatMap((x) => {
                    console.log("processor:", x);
                    _mainBuild.processor = new Processor(x.id, x.processor_name, x.processor_price);
                    return this.getRAMById(_curBuild.ram_type);
                }),
                concatMap((x) => {
                    console.log("ram:", x);
                    _mainBuild.ram_type = new RAMType(x.id, x.ram_name, x.ram_price);
                    return of(_mainBuild);
                })
            ).subscribe((result) => {
                observer.next(result);
                observer.complete();
            });
        });
    }

    static getBuildById(build_id) {
        return new Observable((observer) => {
            axios.get("/parts_api/get_build_by_id/" + build_id).then((result) => {
                observer.next(result.data);
                observer.complete();
            });
        });
    }

    static getProcessorById(processor_id) {
        return new Observable((observer) => {
            axios.get("/parts_api/get_processor_by_id/" + processor_id).then((result) => {
                observer.next(result.data);
                observer.complete();
            });
        });
    }

    static getRAMById(ram_id) {
        return new Observable((observer) => {
            axios.get("/parts_api/get_ram_by_id/" + ram_id).then((result) => {
                observer.next(result.data);
                observer.complete();
            });
        });
    }
}