import { Injectable } from '@angular/core';

// TODO реализовать сохранение в localStorage
const DOCS = [
  { id: 1, title: 'Getting Started', content: 'This is the getting started guide.', comments: [] },
  { id: 2, title: 'API Reference', content: 'This is the API reference.', comments: [] },
  { id: 3, title: 'Tutorials', content: 'These are the tutorials.', comments: [] },
];

@Injectable({
  providedIn: 'root',
})
export class DocsService {
  getDocsList() {
    return DOCS;
  }

  getDocById(id: number) {
    return DOCS.find(doc => doc.id === id);
  }

  createDoc(title: string, content: string) {
    const newDoc = {
      id: DOCS.length + 1,
      title,
      content,
      comments: [],
    };
    DOCS.push(newDoc);
    return newDoc;
  }

  updateDoc(id: number, content: string) {
    const doc = DOCS.find(d => d.id === id);
    if (doc) {
      doc.content = content;
    }
  }

  deleteDoc(id: number) {
    const docIndex = DOCS.findIndex(d => d.id === id);
    if (docIndex !== -1) {
      DOCS.splice(docIndex, 1);
    }
  }

  addComment(docId: number, commentText: string) {
    const doc = DOCS.find(d => d.id === docId);
    if (doc) {
      const newComment = {
        id: doc.comments.length + 1,
        text: commentText,
      };
      doc.comments.push(newComment as never);
      return newComment;
    }
    return null;
  }

}
