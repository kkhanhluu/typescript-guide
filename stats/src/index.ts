import { WinsAnalysis } from './analyzers/WinsAnalysis';
import { MatchData } from './MatchData';
import { MatchReader } from './MatchReader';
import { ConsoleReport } from './reportTargets/ConsoleReport';
import { HtmlReport } from './reportTargets/HtmlReport';
import { Summary } from './Summary';

const matchReader = new MatchReader('football.csv');
matchReader.read();

const summary = new Summary(new WinsAnalysis('Arsenal'), new HtmlReport());

summary.buildAndPrintReport(matchReader.data);
