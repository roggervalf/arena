async function handler(req, res) {
  const {depth, jobId, maxChildren, queueName} = req.query;
  const {Flows} = req.app.locals;
  const flow = await Flows.get('Connection name 1', 'Flow server 1');
  if (!flow) return res.status(404).json({error: 'flow not found'});
  try {
    const jobFlow = await flow.getFlow({
      id: jobId,
      queueName,
      depth,
      maxChildren,
    });
    return res.status(200).json(jobFlow);
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
}
module.exports = handler;
