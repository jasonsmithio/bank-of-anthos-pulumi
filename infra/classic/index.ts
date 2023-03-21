// Copyright 2016-2018, Pulumi Corporation.  All rights reserved.

import * as k8s from "@pulumi/kubernetes";
import * as pulumi from "@pulumi/pulumi";
import { kubeconfig, k8sProvider } from "./k8s-cluster";
import * as path from "path";


// Create a canary deployment to test that this cluster works.
const name = `${pulumi.getProject()}-${pulumi.getStack()}`;
//const canaryLabels = { app: `canary-${name}` };
//const canary = new k8s.apps.v1.Deployment("canary", {
//    spec: {
//       selector: { matchLabels: canaryLabels },
//        replicas: 1,
//        template: {
//            metadata: { labels: canaryLabels },
//            spec: { containers: [{ name, image: "nginx" }] },
//        },
//    },
//}, { provider: k8sProvider }); 

// Export the Kubeconfig so that clients can easily access our cluster.

const ns = new k8s.core.v1.Namespace(name, {}, { provider: k8sProvider });

export let kubeConfig = kubeconfig;

/*const istio = new k8s.yaml.ConfigGroup("istio", {
  files: [path.join("../../apps/istio-manifests/", "*.yaml")],
}, {
  providers: {"kubernetes": k8sProvider }
});*/

const istio = new k8s.yaml.ConfigFile("istio", {
    file: "https://raw.githubusercontent.com/GoogleCloudPlatform/bank-of-anthos/main/istio-manifests/frontend-ingress.yaml" ,
}, {
    providers: { "kubernetes": k8sProvider }
});

/*const example = new k8s.yaml.ConfigGroup("example", {
    files: [path.join("../../apps/istio-manifests", "*.yaml")],
});*/
