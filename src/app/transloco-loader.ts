import { inject, Injectable } from "@angular/core";
import { Translation, TranslocoLoader } from "@ngneat/transloco";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
    private http = inject(HttpClient);

    getTranslation(lang: string) {
        console.log("Loading translation from:", `assets/i18n/${lang}.json`);
        return this.http.get<Translation>(`assets/i18n/${lang}.json`);
    }
/*
        getTranslation(lang: string, data?: TranslocoLoaderData): Observable<any> {
            const scope = data?.scope; // Extract scope from data
            console.log("Scope:", scope);
    
            // If scope exists, build the path without repeating it
            const path = scope && !lang.includes(scope)
                ? `assets/i18n/${scope}/${lang}.json` // Scoped translation (e.g., navbar/en.json)
                : `assets/i18n/${lang}.json`;         // Global translation (e.g., en.json)
    
            console.log("Loading translation from:", path);
            return this.http.get<any>(path);
        }*/
}
