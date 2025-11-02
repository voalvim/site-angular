import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeDate'
})
export class CapitalizeDatePipe implements PipeTransform {
  transform(input: string | null): string {

    let value = input ?? "Input is null.";
    let primeiraMetade = value.slice(0, 6);
    let letraMaiuscula = value.charAt(6).toUpperCase();
    let segundaMetade = value.slice(7, value.length)

    return primeiraMetade + letraMaiuscula + segundaMetade; 
  }
}
