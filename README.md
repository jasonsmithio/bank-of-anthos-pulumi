# Bank of Anthos on GKE with Pulumi and Typescript

## What is this demo?

[Bank of Anthos](https://github.com/GoogleCloudPlatform/bank-of-anthos) is a demo created by [Google Cloud](https://cloud.google.com) to demonstrate deploying a cloud native application on [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine). In the official documentation, we show you how to deploy with [kubectl](https://kubernetes.io/docs/reference/kubectl/). However, in a real world scenario, typing those `kubectl` commands can get tedious. What if you could include it in your Infrastructure as Code (IaC) definitions.

## What is Pulumi?

[Pulumi](https://www.pulumi.com/) is an IaC SDK that is all about engineers. No longer do you have to learn a proprietary language in order to deploy cloud resources. You can use the language that you already use day in and day out. We're talking Go, YAML, TypeScript, JavaScript, Python, C#, and Java. This makes deploying and managing resources in the cloud that much easier and can also help streamline your GitOps strategy.

In this demo, we will build a GKE Autopilot cluster and then deploy Bank of Anthos.  Talk is cheap so let's try to deploy this application!

## The Demo

### Prerequisites

It should go without saying but you do need a Google Cloud and a Pulumi account. If you haven't set up either, I have some links that can help you with both [Google Cloud](https://cloud.google.com/docs/get-started) and [Pulumi](https://www.pulumi.com/docs/get-started/gcp/). Both services have generous free tiers so don't worry about running this test.

Make sure that you install [gcloud CLI](https://cloud.google.com/sdk/docs/install) and then run `gcloud components install kubectl` for Google Cloud as well as the [Pulumi CLI](https://www.pulumi.com/docs/get-started/install/).

### Staging your Machine

First let's download some code.

```bash
git clone https://github.com/jasonsmithio/bank-of-anthos-pulumi.git
cd bank-of-anthos-pulumi
```
