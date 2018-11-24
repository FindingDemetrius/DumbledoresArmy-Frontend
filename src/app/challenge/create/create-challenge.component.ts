import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

import { MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';

import { ChallengeService } from '../../services/challenge.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'app-create-challenge',
    templateUrl: 'create-challenge.component.html',
    styleUrls: ['create-challenge.component.css']
})

export class CreateChallengeComponent implements OnInit {

    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    separatorKeyCodes: number[] = [ENTER, COMMA];
    genreCtrl = new FormControl();
    filteredGenres: Observable<string[]>;
    genres: string[];
    allGenres: string[] = [];

    @ViewChild('genreInput') genreInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutoComplete: MatAutocomplete;

    constructor(private fb: FormBuilder, private challengeService: ChallengeService) {
        this.filteredGenres = this.genreCtrl.valueChanges.pipe(
            startWith(null),
            map((genre: string | null) => genre ? this._filter(genre) : this.allGenres.slice())
        );
    }

    ngOnInit() {
        // this.getGenres()
    }

    // getGenres() {
    //     this.challengeService.getGenresList()
    //         .subscribe(genres => this.allGenres = genres)
    // }

    add(event: MatChipInputEvent) {
        if (!this.matAutoComplete.isOpen) {
            const input = event.input;
            const value = event.value;

            if ((value || '').trim()) {
                this.genres.push(value.trim());
            }

            if (input) {
                input.value = '';
            }

            this.genreCtrl.setValue(null);
        }
    }

    remove(genre: string) {
        const index = this.genres.indexOf(genre);
        if (index >= 0) {
            this.genres.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent) {
        this.genres.push(event.option.viewValue);
        this.genreInput.nativeElement.value = '';
        this.genreCtrl.setValue(null);
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.allGenres.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
    }
}
