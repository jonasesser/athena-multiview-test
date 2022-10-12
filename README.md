# Athena Plugin - Example WebView

A plugin with example usage with WebViews for the Athena Framework compatible with `3.9.0` of the [Athena Framework](https://athenaframework.com/).

## Installation

1. Open a command prompt in your main Athena Directory.
2. Navigate to the plugins folder.

```ts
cd src/core/plugins
```

3. Copy the command below.

**SSH**

```
git clone git@github.com:jonasesser/athena-multiview-test.git
```

**HTTPS**

```
git clone https://github.com/jonasesser/athena-multiview-test.git
```

4. Start the Server

## Testcase 1 - Closing page refreshes the other

1. Enter admin command in client console: /multiviewtest

-> Two pages will open, one direkt and the other 2 seconds later

2. Close the first page on the left side by pressing on Close button

-> The left pages closes, the other will be refreshed and the timer starts again from 0 seconds

3. Optional: Close the second page by open Inventory first

Expected behaviour:

1. Page on the right side does not refresh
2. Timer should not be interrupted

## Testcase 2 - No Gamecontrols

Chat will be unusable if opened it while a page is opened

1. Enter admin command in client console: /multiviewtest

2. Close the first page

3. Open chat again -> chat not opens but cursor back

4. Close second page

5. Open chat again -> No game controls anymore -> Reconnect!
