import {
  Archive,
  Code,
  File,
  FileSpreadsheet,
  FileText,
  Presentation,
} from 'lucide-react';
import { dataService, type OperationArtifact } from 'librechat-data-provider';
import { useLocalize } from '~/hooks';
import { formatDateTime, formatFileSize } from '~/utils/operationDisplay';

function ArtifactIcon({ mediaType }: { mediaType: string }) {
  const type = mediaType.toLowerCase();
  if (type.includes('spreadsheet') || type.includes('excel')) {
    return <FileSpreadsheet className="icon-md text-green-600" aria-hidden="true" />;
  }
  if (type.includes('pdf')) {
    return <FileText className="icon-md text-red-600" aria-hidden="true" />;
  }
  if (type.includes('presentation') || type.includes('powerpoint')) {
    return <Presentation className="icon-md text-orange-600" aria-hidden="true" />;
  }
  if (type.includes('json')) {
    return <Code className="icon-md text-blue-600" aria-hidden="true" />;
  }
  if (type.includes('zip') || type.includes('archive')) {
    return <Archive className="icon-md text-text-secondary" aria-hidden="true" />;
  }
  return <File className="icon-md text-text-secondary" aria-hidden="true" />;
}

function ArtifactCard({ artifact }: { artifact: OperationArtifact }) {
  const localize = useLocalize();
  const downloadUrl = dataService.getOperationArtifactDownloadUrl(artifact.artifact_id);

  return (
    <div className="flex items-start gap-3 rounded-lg border border-border-light bg-surface-secondary p-3">
      <ArtifactIcon mediaType={artifact.media_type} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-text-primary">{artifact.name}</p>
        <p className="text-xs text-text-secondary">
          {formatFileSize(artifact.size)} · {formatDateTime(artifact.created_at)}
        </p>
        <div className="mt-2 flex gap-2">
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-surface-active px-2 py-1 text-xs font-medium text-text-primary hover:bg-surface-active-alt"
          >
            {localize('com_nanobase_operation_action_open')}
          </a>
          <a
            href={downloadUrl}
            download={artifact.filename}
            className="rounded-md border border-border-light px-2 py-1 text-xs font-medium text-text-primary hover:bg-surface-active"
          >
            {localize('com_nanobase_operation_action_download')}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function OperationArtifactList({ artifacts }: { artifacts: OperationArtifact[] }) {
  const localize = useLocalize();

  if (artifacts.length === 0) {
    return null;
  }

  return (
    <section className="space-y-2">
      <h3 className="text-sm font-semibold text-text-primary">
        {localize('com_nanobase_operation_artifacts_title')}
      </h3>
      <div className="space-y-2">
        {artifacts.map((artifact) => (
          <ArtifactCard key={artifact.artifact_id} artifact={artifact} />
        ))}
      </div>
    </section>
  );
}
