import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { DocsList } from './docs-list/docs-list';
import { DocsService } from '../../services/docs';
import { CommentsList } from './comments-list/comments-list';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HighlightPannel } from './highlight-pannel/highlight-pannel';

@Component({
  selector: 'app-docs',
  imports: [DocsList, CommentsList, HighlightPannel],
  templateUrl: './docs.html',
  styleUrl: './docs.scss',
})
export class DocsComponent {
  docsService: DocsService = inject(DocsService);
  // TODO добавить типизацию
  // перевести на Signals
  docsList: any[] = [];
  commentsList: any[] = [];
  openedDoc: any = null;
  safeHtml: SafeHtml | null = null;

  highlightButtonsTop = 0;
  currentSelectionRange: Range | null = null;
  underlineColorSelected: string | null = null;
  highlightColorSelected: string | null = null;

  @ViewChild('contentContainer') container!: ElementRef<HTMLElement>;

  @HostListener('mouseup')
  onMouseUp() {
    // При выделении:
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
      this.currentSelectionRange = null; // Сбрасываем сохраненный диапазон, если выделение отсутствует, для скрытия кнопок
      return;
    }
    const range = selection.getRangeAt(0);
    this.currentSelectionRange = range.cloneRange(); // Сохраняем текущий диапазон для дальнейшего использования

    const rect = range.getBoundingClientRect();
    this.highlightButtonsTop = rect.top - rect.height;
    console.log('mouseup Выделенный текст:', selection, range, rect);

    //TODO: ограничить контейнером 'contentContainer'
  }

  constructor(private sanitizer: DomSanitizer) {
    this.docsList = this.docsService.getDocsList();
  }

  // TODO добавить дебаунс на сохранение
  saveDocHtml() {
    const html = this.container.nativeElement.innerHTML;
    this.docsService.updateDoc(this.openedDoc.id, html);
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(html);
  }

  docSelected(docId: number) {
    this.openedDoc = this.docsService.getDocById(docId);
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.openedDoc.content);
    this.commentsList = this.openedDoc.comments;
  }

  createDoc() {
    this.docsService.createDoc('Новый документ', '');
  }

  onUnderlineColorSelected(color: string) {
    this.underlineColorSelected = color;
  }

  onHighlightColorSelected(color: string) {
    this.highlightColorSelected = color;
  }

  // TODO: ограничить контейнером 'contentContainer'
  applyHighlight() {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || selection.rangeCount === 0) return;
    const range = this.currentSelectionRange;
    if (!range) return;

    const rect = range.getBoundingClientRect();
    this.highlightButtonsTop = rect.top - rect.height;

    const span = document.createElement('span');
    const color = this.highlightColorSelected;
    span.style.backgroundColor = `${color}`;

    this.docsService.addComment(this.openedDoc.id, 'Сохранение не реализовано, но комментарий добавлен :)');

    // Оборачиваем выделенный фрагмент
    try {
      range.surroundContents(span);
      this.saveDocHtml();
    } catch (e) {
      // TODO реализовать пересечение тегов
      console.error('Пересечение тегов слишком сложное для простого surroundContents', e);
    }
  }

  applyUnderline() {
    // TODO вынести переиспользуемый код
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || selection.rangeCount === 0) return;
    const range = this.currentSelectionRange;
    if (!range) return;

    const rect = range.getBoundingClientRect();
    this.highlightButtonsTop = rect.top - rect.height;

    // TODO: ограничить контейнером 'contentContainer'
    const span = document.createElement('span');
    const color = this.underlineColorSelected;

    span.style.borderBottom = `3px solid ${color}`;
    // Оборачиваем выделенный фрагмент
    try {
      range.surroundContents(span);
      this.saveDocHtml();
      selection.removeAllRanges();
    } catch (e) {
      // TODO реализовать пересечение тегов
      console.error('Пересечение тегов слишком сложное для простого surroundContents', e);
    }
  }

}
