import "./script-1.mjs";
import "./script-2.mjs";

import { greetingInstance } from "./greeting.mjs";

greetingInstance.greet("Ale");

console.log("Index stampa:", greetingInstance.greeting);
