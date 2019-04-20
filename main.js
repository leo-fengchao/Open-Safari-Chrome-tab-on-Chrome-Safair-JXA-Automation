var chrome = Application('Google Chrome');
var safari = Application('Safari');
var systemEvents = Application('System Events');
const frontmost_app_name = Application('System Events').applicationProcesses.where({ frontmost: true }).name()[0];

if (frontmost_app_name == 'Safari') {
	var safari_current_tab_url = safari.windows[0].currentTab.url();
	closeSafariTab();
	chrome.activate();
	if (chrome.windows.length <= 1) {
		chrome.Document().make();
	}
  var tab = chrome.Tab({
    url: safari_current_tab_url
  });
  chrome.windows[0].tabs.push(tab);
} else if (frontmost_app_name == 'Google Chrome'){
  var chrome_current_tab_url = chrome.windows[0].activeTab.url();
	closeChromeTab();
	safari.activate();
	if (safari.windows.length <= 1) {
		safari.Document().make();
	}
  var tab = safari.Tab({
    url: chrome_current_tab_url
  });
  tabCount = safari.windows[0].tabs.push(tab) - 1;
  safari.windows[0].currentTab = safari.windows[0].tabs[tabCount];
} else{

}

function closeSafariTab(){
	var safariProcess = systemEvents.processes.byName('Safari');
	var safariFileMenu = safariProcess.menuBars[0].menuBarItems.byName('文件');
	var safariCloseMenu = safariFileMenu.menus[0].menuItems.byName('关闭标签页');
	safariCloseMenu.click();
}

function closeChromeTab(){
	var chromeProcess = systemEvents.processes.byName('Google Chrome');
	var chromeFileMenu = chromeProcess.menuBars[0].menuBarItems.byName('文件');
	var chromeCloseMenu = chromeFileMenu.menus[0].menuItems.byName('关闭标签页');
	chromeCloseMenu.click();
}
