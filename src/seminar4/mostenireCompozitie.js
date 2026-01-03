// Tipul de bază
class Software {
  constructor(name) {
    this.name = name;
  }

  run() {
    console.log(`${this.name} is running...`);
  }
}

// Tipul moștenit: Browser
class Browser extends Software {
  constructor(name) {
    super(name);
    this.plugins = [];
  }

  addPlugin(plugin) {
    this.plugins.push(plugin);
    console.log(`Plugin "${plugin.name}" installed in ${this.name}`);
  }

  run() {
    console.log(
      `${this.name} browser is running with ${this.plugins.length} plugin(s).`
    );
    this.plugins.forEach((p) => p.activate());
  }
}

// Tipul compus: Plugin
class Plugin {
  constructor(name) {
    this.name = name;
  }

  activate() {
    console.log(`Plugin "${this.name}" is active.`);
  }
}

// --- testare ---
const chrome = new Browser("Google Chrome");
const adblock = new Plugin("AdBlocker");
const darkMode = new Plugin("DarkMode");

chrome.addPlugin(adblock);
chrome.addPlugin(darkMode);

chrome.run();
