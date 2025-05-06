import {
  Container,
  EmptyState,
  Flex,
  Heading,
  Table,
  VStack,
} from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { FiSearch } from "react-icons/fi"
import { z } from "zod"

import { CommunesService } from "@/client"
import PendingCommunes from "@/components/Pending/PendingCommunes"
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination.tsx"

const itemsSearchSchema = z.object({
  page: z.number().catch(1),
})

const PER_PAGE = 7

function getCommunesQueryOptions({ page }: { page: number }) {
  return {
    queryFn: () =>
      CommunesService.readCommunes({ skip: (page - 1) * PER_PAGE, limit: PER_PAGE }),
    queryKey: ["communes", { page }],
  }
}

export const Route = createFileRoute("/_layout/communes")({
  component: Communes,
  validateSearch: (search) => itemsSearchSchema.parse(search),
})

function CommunesTable() {
  const navigate = useNavigate({ from: Route.fullPath })
  const { page } = Route.useSearch()

  const { data, isLoading, isPlaceholderData } = useQuery({
    ...getCommunesQueryOptions({ page }),
    placeholderData: (prevData) => prevData,
  })

  const setPage = (page: number) =>
    navigate({
      search: (prev: { [key: string]: string }) => ({ ...prev, page }),
    })

  const communes = data?.data.slice(0, PER_PAGE) ?? []
  const count = data?.count ?? 0

  if (isLoading) {
    return <PendingCommunes />
  }

  if (communes.length === 0) {
    return (
      <EmptyState.Root>
        <EmptyState.Content>
          <EmptyState.Indicator>
            <FiSearch />
          </EmptyState.Indicator>
          <VStack textAlign="center">
            <EmptyState.Title>Vous n'avez pas encore de communes</EmptyState.Title>
          </VStack>
        </EmptyState.Content>
      </EmptyState.Root>
    )
  }

  return (
    <>
      <Table.Root size={{ base: "sm", md: "md" }}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader w="sm">Code INSEE</Table.ColumnHeader>
            <Table.ColumnHeader w="sm">Nom</Table.ColumnHeader>
            <Table.ColumnHeader w="sm">Code Postal</Table.ColumnHeader>
            <Table.ColumnHeader w="sm">Densité population</Table.ColumnHeader>
            <Table.ColumnHeader w="sm">Place camping hotel</Table.ColumnHeader>
            <Table.ColumnHeader w="sm">Nombre medecin</Table.ColumnHeader>
            <Table.ColumnHeader w="sm">Nombre intervention</Table.ColumnHeader>
            <Table.ColumnHeader w="sm">Latitude</Table.ColumnHeader>
            <Table.ColumnHeader w="sm">Longitude</Table.ColumnHeader>
            <Table.ColumnHeader w="sm">Nombre d'habitants</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {communes?.map((commune) => (
            <Table.Row key={commune.code_insee} opacity={isPlaceholderData ? 0.5 : 1}>
              <Table.Cell truncate maxW="sm">
                {commune.code_insee}
              </Table.Cell>
              <Table.Cell truncate maxW="sm">
                {commune.nom}
              </Table.Cell>
              <Table.Cell truncate maxW="sm">
                {commune.code_postal}
              </Table.Cell>
              <Table.Cell
                color={!commune.densite_pop ? "gray" : "inherit"}
              >
                {commune.densite_pop || "N/A"}
              </Table.Cell>
              <Table.Cell
                color={!commune.place_camping_hotel ? "gray" : "inherit"}
              >
                {commune.place_camping_hotel || "N/A"}
              </Table.Cell>
              <Table.Cell
                color={!commune.nombre_medecin ? "gray" : "inherit"}
              >
                {commune.nombre_medecin || "N/A"}
              </Table.Cell>
              <Table.Cell
                color={!commune.nombre_intervention ? "gray" : "inherit"}
              >
                {commune.nombre_intervention || "N/A"}
              </Table.Cell>
              <Table.Cell
                color={!commune.latitude ? "gray" : "inherit"}
              >
                {commune.latitude || "N/A"}
              </Table.Cell>
              <Table.Cell
                color={!commune.longitude ? "gray" : "inherit"}
              >
                {commune.longitude || "N/A"}
              </Table.Cell>
              <Table.Cell
                color={!commune.nombre_habitants ? "gray" : "inherit"}
              >
                {commune.nombre_habitants || "N/A"}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Flex justifyContent="flex-end" mt={4}>
        <PaginationRoot
          count={count}
          pageSize={PER_PAGE}
          onPageChange={({ page }) => setPage(page)}
        >
          <Flex>
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </Flex>
        </PaginationRoot>
      </Flex>
    </>
  )
}

function Communes() {
  return (
    <Container maxW="full">
      <Heading size="lg" pt={12}>
        Communes
      </Heading>
      <CommunesTable />
    </Container>
  )
}
