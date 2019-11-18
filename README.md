# SIT ICT2101 Project 2019 

LTA is in a large collaborative project with SIT to improve the commuting experience specifically during the First Mile and Last Mile (FMLM) portions of their journey. Our proposed mobile application (referred to as **Amble** hereafter) aims to improve the entire commute journey of users, specifically during the FMLM segments of walking to and fro from their current location to their intended destination. Amble will serve primarily as a navigational application for the user by providing routing functionality between points on the map. Additionally, through the use of gamification, Amble will allow users to better appreciate their walking experience by enticing them to explore their surroundings more by suggesting different nearby landmarks that they could check out and be able to view and create artworks at those locations, while on their FMLM journey.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

#### Android

You will need Node, Watchman, the React Native command line interface, a JDK, and Android Studio.

While you can use any editor of your choice to develop your app, you will need to install Android Studio in order to set up the necessary tooling to build your React Native app for Android.

##### Node & Watchman 

We recommend installing Node and Watchman using `Homebrew`. Run the following commands in a Terminal after installing Homebrew:

```
brew install node
brew install watchman
```

If you have already installed Node on your system, make sure it is Node 8.3 or newer.

`Watchman` is a tool by Facebook for watching changes in the filesystem. It is highly recommended you install it for better performance.

##### Java Development Kit

We recommend installing JDK using `Homebrew`. Run the following commands in a Terminal after installing Homebrew:

```
brew tap AdoptOpenJDK/openjdk
brew cask install adoptopenjdk8
```

If you have already installed JDK on your system, make sure it is JDK 8 or newer.

##### Android development environment

Setting up your development environment can be somewhat tedious if you're new to Android development. If you're already familiar with Android development, there are a few things you may need to configure. In either case, please make sure to carefully follow the next few steps.

**1. Install Android Studio**

Download and install Android Studio. Choose a "Custom" setup when prompted to select an installation type. Make sure the boxes next to all of the following are checked:
- Android SDK
- Android SDK Platform
- Performance (Intel ® HAXM) (See here for AMD)
- Android Virtual Device

Then, click "Next" to install all of these components.

> If the checkboxes are grayed out, you will have a chance to install these components later on.

Once setup has finalized and you're presented with the Welcome screen, proceed to the next step.

**2. Install the Android SDK**

Android Studio installs the latest Android SDK by default. Building a React Native app with native code, however, requires the `Android 9 (Pie)` SDK in particular. Additional Android SDKs can be installed through the SDK Manager in Android Studio.

The SDK Manager can be accessed from the "Welcome to Android Studio" screen. Click on "Configure", then select "SDK Manager".

!["Welcome to Android Studio" screen](https://facebook.github.io/react-native/docs/assets/GettingStartedAndroidStudioWelcomeMacOS.png)

> The SDK Manager can also be found within the Android Studio "Preferences" dialog, under **Appearance & Behavior → System Settings → Android SDK.**

Select the "SDK Platforms" tab from within the SDK Manager, then check the box next to "Show Package Details" in the bottom right corner. Look for and expand the `Android 9 (Pie)` entry, then make sure the following items are checked:

Next, select the "SDK Tools" tab and check the box next to "Show Package Details" here as well. Look for and expand the "Android SDK Build-Tools" entry, then make sure that `28.0.3` is selected.

Finally, click "Apply" to download and install the Android SDK and related build tools.

**3. Configure the ANDROID_HOME environment variable**

The React Native tools require some environment variables to be set up in order to build apps with native code.

Add the following lines to your `$HOME/.bash_profile` or `$HOME/.bashrc` config file:

```
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

> `.bash_profile` is specific to `bash`. If you're using another shell, you will need to edit the appropriate shell-specific config file.

Type `source $HOME/.bash_profile` to load the config into your current shell. Verify that ANDROID_HOME has been added to your path by running `echo $PATH`.

> Please make sure you use the correct Android SDK path. You can find the actual location of the SDK in the Android Studio "Preferences" dialog, under **Appearance & Behavior → System Settings → Android SDK.**

### Preparing the Android device

You will need an Android device to run your React Native Android app. This can be either a physical Android device, or more commonly, you can use an Android Virtual Device which allows you to emulate an Android device on your computer.

Either way, you will need to prepare the device to run Android apps for development.

#### Using a physical device

If you have a physical Android device, you can use it for development in place of an AVD by plugging it in to your computer using a USB cable and following the instructions [here](https://facebook.github.io/react-native/docs/running-on-device).

#### Using a virtual device

If you use Android Studio to open `./AwesomeProject/android`, you can see the list of available Android Virtual Devices (AVDs) by opening the "AVD Manager" from within Android Studio. Look for an icon that looks like this:

![AVD Manager Icon](https://facebook.github.io/react-native/docs/assets/GettingStartedAndroidStudioAVD.png)

If you have recently installed Android Studio, you will likely need to [create a new AVD](https://developer.android.com/studio/run/managing-avds.html). Select "Create Virtual Device...", then pick any Phone from the list and click "Next", then select the **Pie** API Level 28 image.

> If you don't have HAXM installed, follow [these instructions](https://github.com/intel/haxm/wiki/Installation-Instructions-on-macOS) to set it up, then go back to the AVD Manager.

Click "Next" then "Finish" to create your AVD. At this point you should be able to click on the green triangle button next to your AVD to launch it, then proceed to the next step.

## Installing 

Step by step guide on installation

```
git clone https://github.com/shawnlim23/ict2101-2019t1-team18-frontend.git
npm install
cd ict2101-2019t1-team18-frontend
yarn install
```

## Running Amble application

```
Go to AndroidManifest.xml (in app/src/main/AndroidManifest.xml) and store the google geolocation API key
Create a .env file with the following variables (GOOGLE_PLACES_API=<Insert your own>, BACKEND_SERVER=112.199.145.252:5000)
react-native start
react-native run-android

``` 

If you use the Yarn package manager, you can use `yarn` instead of `npx` when running React Native commands inside the Amble project.

Run `npx react-native run-android` inside Amble project folder:

```
cd ProjectDirectory
npx react-native run-android
```

If everything is set up correctly, you should see Amble app running in your Android emulator shortly.

`npx react-native run-android` is one way to run your app - you can also run it directly from within Android Studio.

> If you can't get this to work, see the [Troubleshooting](https://facebook.github.io/react-native/docs/troubleshooting#content) page.

### That's it!

Congratulations! You've successfully run Amble app.

### Installing
Step by step guide on installation
```
git clone https://github.com/shawnlim23/ict2101-2019t1-team18-frontend.git
npm install -g expo-cli
cd ict2101-2019t1-team18-frontend
yarn install
```

### Running the mobile application

![](https://facebook.github.io/react-native/docs/assets/GettingStartedCongratulations.png)

## Built With

* [React Native](https://facebook.github.io/react-native/) - The mobile development framework used

## Authors

* **SIT ICT2101 2019 Team 18** 
- *Initial work* 
- [Jun Rong](https://github.com/markeyys)
- [Ted Lai](https://github.com/mynameisted)
- [Wei Han](https://github.com/tanweihan)
- [Yi Hang](https://github.com/Nova136)
- [Amirulamin](https://github.com/Amirulamin-SIT)
- [Shawn Lim](https://github.com/shawnlim23)