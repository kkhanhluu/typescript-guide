import { CharactersCollection } from './CharactersCollection';
import { LinkedList } from './LinkedList';
import { NumbersCollection } from './NumbersCollection';

const numbersCollection = new NumbersCollection([0, -5, 10, 3, 2, 1, 15]);
const charactersCollection = new CharactersCollection('Xycbaaa');
const linkedList = new LinkedList();
linkedList.add(500);
linkedList.add(-10);
linkedList.add(-4);
linkedList.add(0);
linkedList.add(17);

linkedList.sort();
linkedList.print();
