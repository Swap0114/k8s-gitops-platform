cat > ~/capstone-project/README.md << 'READMEEOF'
# 🚀 Production-Grade Kubernetes Platform

> Built as Capstone Project 5 — DevOps Institute Mumbai

A production-ready microservices platform built with Kubernetes, Helm, ArgoCD, Ansible, Prometheus, and Grafana. This project demonstrates real-world DevOps practices including GitOps, Infrastructure as Code, and full observability.

---

## 🎯 Business Problem Solved

A SaaS company scaling from monolith to microservices needed:
- ✅ Zero-downtime deployments
- ✅ Auto-scaling during traffic spikes
- ✅ Full observability on one screen
- ✅ All changes through Git — no manual kubectl in production

---

## 🏗️ Architecture
Developer → Git Push → ArgoCD Detects → Helm Deploys → K8s Runs
↓
Prometheus Scrapes → Grafana Displays → Slack Alerts

### Infrastructure Stack
| Tool | Purpose |
|------|---------|
| Kubernetes (EKS) | Container orchestration |
| Terraform | EKS cluster provisioning |
| Ansible | Worker node configuration |
| Helm | Application packaging |
| ArgoCD | GitOps continuous delivery |
| Prometheus | Metrics collection |
| Grafana | Visualization & dashboards |

---

## 📁 Repository Structure
k8s-gitops-platform/     # Main repo — Helm charts
├── service-a/           # Microservice A Helm chart
├── service-b/           # Microservice B Helm chart
├── service-c/           # Microservice C Helm chart
└── README.md
k8s-gitops-config/       # ArgoCD watches this repo
├── apps/
│   ├── service-a.yaml
│   ├── service-b.yaml
│   └── service-c.yaml
└── production/
k8s-ansible-config/      # Infrastructure automation
├── roles/
│   ├── node-setup/
│   ├── node-exporter/
│   ├── prometheus-config/
│   └── alertmanager-config/
├── inventory/
└── site.yml

---

## 🔄 GitOps Workflow

Developer updates values.yaml (e.g. new image tag)
Creates Pull Request → Code Review
Merge to main branch
ArgoCD detects change (polls every 3 mins)
ArgoCD syncs → Helm upgrade → Rolling update
Zero downtime — new pods start before old ones stop
If manual kubectl change detected → ArgoCD auto-reverts


---

## ⚙️ Kubernetes Resources

- **Deployments** — 3 microservices, 2 replicas each
- **Services** — ClusterIP for internal communication
- **HPA** — Auto-scales service-a from 2 to 8 pods at 70% CPU
- **Namespaces** — staging and production with RBAC
- **ConfigMaps** — Non-sensitive configuration
- **Secrets** — Sensitive credentials

---

## 📋 Ansible Roles

| Role | What it does |
|------|-------------|
| node-setup | OS hardening, packages, timezone, swap disabled |
| node-exporter | Installs Prometheus Node Exporter as systemd service |
| prometheus-config | Dynamic scrape targets via Jinja2 templates |
| alertmanager-config | Slack alert routing configuration |

```bash
# Run against all EC2 worker nodes
ansible-playbook -i inventory/aws_ec2.yml site.yml
```

---

## 📊 Monitoring Stack

- **Prometheus** — Scrapes metrics every 15 seconds
- **Grafana** — Dashboards for cluster overview and per-service health
- **Node Exporter** — OS-level metrics from all worker nodes
- **Alertmanager** — Routes alerts to Slack

### Key Metrics Tracked
- CPU and memory per pod
- Request rate and error rate
- Pod restart count
- Node disk and network usage

### Alert Rules
```yaml
# Fires when pod restarts > 3 times in 5 minutes
alert: PodRestartingTooMuch
expr: rate(kube_pod_container_status_restarts_total[5m]) * 300 > 3
for: 5m
```

---

## 🚀 Quick Start

### Prerequisites
```bash
kubectl, helm, kind, ansible, terraform
```

### Local Development
```bash
# Create local cluster
kind create cluster --name capstone

# Deploy all services
helm install service-a ./service-a -n production
helm install service-b ./service-b -n production
helm install service-c ./service-c -n production

# Install monitoring
helm install prometheus prometheus-community/prometheus -n monitoring
helm install grafana grafana/grafana -n monitoring
```

### GitOps Deployment
```bash
# Just push to Git — ArgoCD does the rest!
git add .
git commit -m "feat: update service-a to v1.2.0"
git push origin main
```

---

## 🔥 Key Features Demonstrated

1. **Zero-downtime deployments** — Kubernetes rolling updates
2. **GitOps** — ArgoCD selfHeal prevents any manual changes
3. **Auto-scaling** — HPA scales 2→8 pods under load
4. **Infrastructure as Code** — Everything in Git, nothing manual
5. **Full observability** — Every service visible on Grafana dashboard
6. **Proactive alerting** — Caught memory leak before users noticed


## 👨‍💻 Built By

**Swaroop** | DevOps Engineer  
DevOps Institute Mumbai — Capstone Project 5  
GitHub: [@Swap0114](https://github.com/Swap0114)  
LinkedIn: https://www.linkedin.com/in/swaroop-suryawanshi-a11a56221/

*This project demonstrates production-grade DevOps practices used daily by senior engineers at companies like Razorpay, PhonePe, and Atlassian.*
READMEEOF
