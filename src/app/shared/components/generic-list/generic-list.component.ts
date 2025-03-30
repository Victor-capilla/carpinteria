// generic-list.component.ts
import { Component, effect, input, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-generic-list',
  standalone: true,
  imports: [CommonModule, FormsModule, AutoCompleteModule, TableModule],
  templateUrl: './generic-list.component.html',
})
export class GenericListComponent<T> {
  headers = input<{ field: keyof T; header: string }[]>([]);
  data = input<T[]>([]);

  filtro = signal('');
  filteredData: WritableSignal<T[]> = signal([]);
  filteredOptions: WritableSignal<string[]> = signal([]);

  constructor() {
    this.filteredData = signal(this.data());

    effect(() => {
      const texto = this.filtro().toLowerCase();
      if (!texto) {
        this.filteredData.set(this.data());
        this.filteredOptions.set([]);
        return;
      }

      const data = this.data();
      const filtered = data.filter((item) =>
        Object.values(item as any).some((val) =>
          String(val).toLowerCase().includes(texto)
        )
      );

      this.filteredData.set(filtered);

      const uniqueValues = new Set<string>();
      data.forEach((item) => {
        Object.values(item as any).forEach((val) => {
          const valStr = String(val).toLowerCase();
          if (valStr.includes(texto)) uniqueValues.add(String(val));
        });
      });
      this.filteredOptions.set(Array.from(uniqueValues));
    });
  }

  onAutocompleteChange(value: string) {
    this.filtro.set(value);
  }
}


