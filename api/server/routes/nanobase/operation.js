const express = require('express');
const {
  proxyOperationJson,
  sendProxyJsonResponse,
  proxyOperationArtifactStream,
  logOperationProxyRequest,
} = require('@librechat/api');
const { requireJwtAuth } = require('~/server/middleware');

const router = express.Router();
const messagePayloadLimit = express.json({ limit: '512kb' });

router.use(requireJwtAuth);

router.get('/health', async (req, res) => {
  logOperationProxyRequest('GET', '/health');
  const result = await proxyOperationJson('/api/v1/operation-center/health');
  sendProxyJsonResponse(res, result);
});

router.post('/message', messagePayloadLimit, async (req, res) => {
  logOperationProxyRequest('POST', '/message');
  const body = {
    workspace_id: req.body.workspace_id ?? 'default',
    user_id: req.body.user_id ?? req.user.id,
    conversation_id: req.body.conversation_id,
    message: req.body.message,
    risk: req.body.risk ?? 'medium',
    requires_approval: req.body.requires_approval ?? false,
    requested_tools: req.body.requested_tools ?? [],
  };

  if (!body.message || typeof body.message !== 'string' || !body.message.trim()) {
    return res.status(400).json({
      ok: false,
      source: 'nanobase-operation-proxy',
      error: 'message is required',
    });
  }

  const result = await proxyOperationJson('/api/v1/operation-center-routed/message', {
    method: 'POST',
    body,
  });
  sendProxyJsonResponse(res, result);
});

router.get('/jobs/:jobId', async (req, res) => {
  const { jobId } = req.params;
  logOperationProxyRequest('GET', `/jobs/${jobId}`);
  const result = await proxyOperationJson(`/api/v1/operation-center/jobs/${jobId}`);
  sendProxyJsonResponse(res, result);
});

router.get('/audit/:executionId', async (req, res) => {
  const { executionId } = req.params;
  logOperationProxyRequest('GET', `/audit/${executionId}`);
  const result = await proxyOperationJson(`/api/v1/operation-center/audit/${executionId}`);
  sendProxyJsonResponse(res, result);
});

router.get('/artifacts/:artifactId/metadata', async (req, res) => {
  const { artifactId } = req.params;
  logOperationProxyRequest('GET', `/artifacts/${artifactId}/metadata`);
  const result = await proxyOperationJson(
    `/api/v1/operation-center/artifacts/${artifactId}/metadata`,
    { stripMetadataPath: true },
  );
  sendProxyJsonResponse(res, result);
});

router.get('/artifacts/:artifactId', async (req, res) => {
  const { artifactId } = req.params;
  logOperationProxyRequest('GET', `/artifacts/${artifactId}`);
  await proxyOperationArtifactStream(artifactId, res);
});

module.exports = router;
