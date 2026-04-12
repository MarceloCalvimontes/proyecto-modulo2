import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Guitar } from "../interfaces/guitar.interface";

@Injectable({
    providedIn: 'root'
})
export class GuitarService {
    private httpRequest = inject(HttpClient);
    public url: string = 'http://localhost:3000/guitars';

    getGuitars(): Observable<Guitar[]> {
        return this.httpRequest.get<Guitar[]>(this.url);
    }
    getGuitarById(id: number): Observable<Guitar> {
        return this.httpRequest.get<Guitar>(`${this.url}/${id}`);
    }
    createGuitar(guitar: Omit<Guitar, 'id'>): Observable<Guitar> {
        console.log('Creating guitar:', guitar);
        return this.httpRequest.post<Guitar>(this.url, guitar);
    }
    updateGuitar(id: number, guitar:Guitar):Observable<Guitar>{
        return this.httpRequest.put<Guitar>(`${this.url}/${id}`, guitar);
    }
    deleteGuitar(id:number): Observable<void>{
        return this.httpRequest.delete<void>(`${this.url}/${id}`);
    }
}