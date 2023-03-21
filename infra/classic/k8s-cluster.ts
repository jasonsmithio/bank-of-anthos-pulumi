import * as gcloud from "@pulumi/gcp";
import * as k8s from "@pulumi/kubernetes";
import * as pulumi from "@pulumi/pulumi";
import * as config from "./config";
import * as path from "path";

//const ip_allocation_policy = new gcloud.container.ClusterIpAllocationPolicy();

const name = "bank-of-anthos";

const cluster = new gcloud.container.Cluster(name, {
    enableAutopilot: true,
    location: config.region,
    project: config.projectId,
    network: config.network,
    ipAllocationPolicy: {},
    releaseChannel: {
        channel: 'STABLE',
    },
     
//    workloadIdentityConfig: {
//        workloadPool: `${config.projectId}.svc.id.goog`,
//    },
});


// Export the Cluster name
export const clusterName = cluster.name;

// Manufacture a GKE-style Kubeconfig. Note that this is slightly "different" because of the way GKE requires
// gcloud to be in the picture for cluster authentication (rather than using the client cert/key directly).
export const kubeconfig = pulumi
    .all([cluster.name, cluster.endpoint, cluster.masterAuth])
    .apply(([name, endpoint, auth]) => {
        const context = `${config.projectId}_${config.zone}_${name}`;
        return `apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: ${auth.clusterCaCertificate}
    server: https://${endpoint}
  name: ${context}
contexts:
- context:
    cluster: ${context}
    user: ${context}
  name: ${context}
current-context: ${context}
kind: Config
preferences: {}
users:
- name: ${context}
  user:
    exec:
      apiVersion: client.authentication.k8s.io/v1beta1
      command: gke-gcloud-auth-plugin
      installHint: Install gke-gcloud-auth-plugin for use with kubectl by following
        https://cloud.google.com/blog/products/containers-kubernetes/kubectl-auth-changes-in-gke
      provideClusterInfo: true
`;
    });

// Export a Kubernetes provider instance that uses our cluster from above.
export const k8sProvider = new k8s.Provider(name, {
  kubeconfig: kubeconfig,
}, {
  dependsOn: [cluster]
});

/*const Istio = new k8s.yaml.ConfigGroup("istio", {
  files: [path.join("../../apps/istio-manifests", "*.yaml")],
}, {
  providers: {"kubernetes": k8sProvider }
});*/

/*const bankOfAnthos = new k8s.yaml.ConfigGroup("bankOfAnthos", {
  files: [path.join("../../apps/kubernetes-manifests", "*.yaml")],
}, {
  providers: { "kubernetes": k8sProvider }
});*/

/*const example = new k8s.yaml.ConfigGroup("example", {
  files: [path.join("../../apps/istio-manifests", "*.yaml")],
});*/