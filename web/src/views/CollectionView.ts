import { Collection } from '../models/Collection';

export abstract class CollectionView<T, K> {
  constructor(public parent: Element, public collection: Collection<T, K>) {}

  abstract renderItem(model: T, itemParent: Element): void;

  render(): void {
    console.log('render');
    this.parent.innerHTML = '';

    const templateElement = document.createElement('template');
    for (let model of this.collection.models) {
      console.log('inside render', model);
      const wrapperElement = document.createElement('div');
      this.renderItem(model, wrapperElement);

      templateElement.content.append(wrapperElement);
    }

    this.parent.append(templateElement.content);
  }
}
