// trim-text.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimText'
})
export class TrimTextPipe implements PipeTransform {
  transform(value: string, limit: number = 100): string {
    if (!value) return '';
    if (value.length <= limit) return value;
    const trimmedText = `${value.slice(0, limit)}...`;
    const fullText = `<span class="more-link">${value}</span>`;
    return `${trimmedText}<a href="javascript:void(0)" class="more-toggle" data-full-text="${fullText}">more</a>`;
  }
}
