import { Table } from "@chakra-ui/react"
import { SkeletonText } from "../ui/skeleton"

const PendingCommunes = () => (
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
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {[...Array(10)].map((_, index) => (
        <Table.Row key={index}>
          <Table.Cell>
            <SkeletonText noOfLines={1} />
          </Table.Cell>
          <Table.Cell>
            <SkeletonText noOfLines={1} />
          </Table.Cell>
          <Table.Cell>
            <SkeletonText noOfLines={1} />
          </Table.Cell>
          <Table.Cell>
            <SkeletonText noOfLines={1} />
          </Table.Cell>
          <Table.Cell>
            <SkeletonText noOfLines={1} />
          </Table.Cell>
          <Table.Cell>
            <SkeletonText noOfLines={1} />
          </Table.Cell>
          <Table.Cell>
            <SkeletonText noOfLines={1} />
          </Table.Cell>
          <Table.Cell>
            <SkeletonText noOfLines={1} />
          </Table.Cell>
          <Table.Cell>
            <SkeletonText noOfLines={1} />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table.Root>
)

export default PendingCommunes
