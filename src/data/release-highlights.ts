// What each Flutter release line actually gave you, so the version table
// answers "why would I move to this one" and not just "what number is it".
//
// Hand-written on purpose. Flutter's release feeds carry versions and dates but
// nothing about what changed, and the headline of a release is an editorial
// call - so these are summarized from Flutter's own release announcements
// rather than generated. Add a line here when Flutter opens a new one; the
// table renders a dash for any line without an entry.
//
// Keep each entry to one short phrase covering the one or two changes a
// developer would actually upgrade for. The linked release notes carry the
// full list.
export const releaseHighlights: Record<string, string> = {
  '3.47':
    'Impeller became the default renderer on macOS, Windows, and Linux; Material and Cupertino split into standalone packages',
  '3.44':
    'Swift Package Manager replaced CocoaPods as the default for iOS and macOS; Hybrid Composition++ for Android platform views',
  '3.41':
    'Platform-specific assets in pubspec.yaml, Android Gradle Plugin 9 support, and Navigator.popUntilWithResult',
  '3.38':
    'Dart dot shorthands, so .start works where MainAxisAlignment.start was required; widget previews in VS Code and Android Studio',
  '3.35':
    'Squircle corners across most Cupertino widgets, CupertinoExpansionTile, and lower iOS startup latency',
  '3.32':
    'Hot reload on the web (experimental) and Cupertino squircles via RoundedSuperellipseBorder',
  '3.29':
    'Impeller on OpenGLES for Android devices without Vulkan, and Dart running on the platform main thread on Android and iOS',
  '3.27':
    'Impeller became the default renderer on modern Android; spacing on Row and Column',
  '3.24': 'Flutter GPU preview and multi-view embedding for Flutter web',
  '3.22':
    'WebAssembly on the stable channel for web, and a feature-complete Vulkan backend for Impeller on Android',
};

/** Flutter publishes release notes per line, keyed off the .0 release. */
export function releaseNotesUrl(line: string): string {
  return `https://docs.flutter.dev/release/release-notes/release-notes-${line}.0`;
}
