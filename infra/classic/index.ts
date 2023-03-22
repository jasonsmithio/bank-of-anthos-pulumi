// Copyright 2016-2018, Pulumi Corporation.  All rights reserved.

import * as k8s from "@pulumi/kubernetes";
import * as pulumi from "@pulumi/pulumi";
import { kubeconfig, k8sProvider } from "./k8s-cluster";
import * as path from "path";


// Create a canary deployment to test that this cluster works.
//const name = `${pulumi.getProject()}-${pulumi.getStack()}`;


export let kubeConfig = kubeconfig;

const jwtSecret = new k8s.yaml.ConfigFile("jwtSecret", {
  file: "../../apps/extras/jwt/jwt-secret.yaml",
}, {
  provider: k8sProvider,
});



const bankOfAnthos = new k8s.yaml.ConfigGroup("bankOfAnthos", {
  files: [path.join("../../apps/kubernetes-manifests/", "*.yaml")],
}, {
  provider: k8sProvider,
});

