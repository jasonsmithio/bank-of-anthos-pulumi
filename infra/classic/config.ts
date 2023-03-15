// Copyright 2016-2021, Pulumi Corporation.  All rights reserved.

import * as gcp from "@pulumi/gcp";
import { Config } from "@pulumi/pulumi";
import * as random from "@pulumi/random";

const config = new Config();

export const projectId = config.require("projectId");
export const region = config.require("region");
export const zone = config.require("zone");
export const network = config.require("network");


/// App config
//export const appPort = parseInt(config.require("appPort"));

/// Kubernetes config
export const k8sNamespace = config.get("k8sNamespace") || "default";
export const k8sServiceAccountName = new random.RandomPet(
    "k8sServiceAccountName",
    { length: 2 }
).id;

export const username = config.get("username") || "admin";

// password is the password for the admin user in the cluster.
// If a password is not set, a strong random password will be generated.
export const password = config.get("password") || new random.RandomPassword(
    "password", { length: 20, special: true }).result;

// GKE master version
// Default to the latest available version.
export const masterVersion = config.get("masterVersion") ||
    gcp.container.getEngineVersions().then(it => it.latestMasterVersion);