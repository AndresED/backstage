import { useEffect, useState } from 'react';
import {
  discoveryApiRef,
  fetchApiRef,
  useApi,
} from '@backstage/core-plugin-api';
import {
  Content,
  Header,
  Page,
  Table,
  TableColumn,
} from '@backstage/core-components';

type ServiceRow = {
  name: string;
  status: string;
  version: string;
  environment: string;
  lastDeployment: string;
};

const columns: TableColumn<ServiceRow>[] = [
  { title: 'Servicio', field: 'name' },
  { title: 'Estado', field: 'status' },
  { title: 'Versión', field: 'version' },
  { title: 'Entorno', field: 'environment' },
  { title: 'Último deploy', field: 'lastDeployment' },
];

export const ServiceHealthPage = () => {
  const discoveryApi = useApi(discoveryApiRef);
  const fetchApi = useApi(fetchApiRef);
  const [rows, setRows] = useState<ServiceRow[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const load = async () => {
      const baseUrl = await discoveryApi.getBaseUrl('service-health');
      const response = await fetchApi.fetch(`${baseUrl}/services`);
      if (!response.ok) {
        setError(`backend respondió ${response.status}`);
        return;
      }
      const body = (await response.json()) as { services: ServiceRow[] };
      setRows(body.services);
    };
    load().catch(cause => setError(String(cause)));
  }, [discoveryApi, fetchApi]);

  return (
    <Page themeId="tool">
      <Header title="Service Health" subtitle="Estado de los servicios ACME" />
      <Content>
        {error ? <p>{error}</p> : null}
        <Table columns={columns} data={rows} options={{ paging: false }} />
      </Content>
    </Page>
  );
};
