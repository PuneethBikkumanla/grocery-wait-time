import React from "react";
import { Stitch, AnonymousCredential } from "mongodb-stitch-browser-sdk";

export class StitchClient extends React.Component {
  static client = null;

  static getStitchClient() {
    if (!this.client) {
      this.client = Stitch.initializeDefaultAppClient(
        "grocery-wait-time-zhxvi"
      );
      this.client.auth.loginWithCredential(new AnonymousCredential());
    }

    return this.client;
  }

  render() {
    return;
  }
}

export default StitchClient;
