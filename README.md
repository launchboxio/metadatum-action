# Metadatum Action

This action provides a mechanism for getting, and setting, metadata stored in Metadatum 

## Usage

### Setting a new value
```yaml 
jobs:
  test:
    permissions:
      contents: 'read'
      id-token: 'write'

    runs-on: ubuntu-22.04
    steps:
      - name: Set a key
        uses: launchboxio/metadatum-action@main
        with:
          action: 'set'
          data: |
            {"some-key": "value1"}
```

### Reading stored values
```yaml 
jobs:
  test:
    permissions:
      contents: 'read'
      id-token: 'write'

    runs-on: ubuntu-22.04
    steps:
      - name: Read
        id: metadata
        uses: launchboxio/metadatum-action@main
        with:
          action: 'get'
          query: '{}'

      - name: Outputs
        run: |
          echo "Stored metadata:"
          echo "${{ steps.metadata.outputs.data }}"
          echo "Full response:"
          echo "${{ steps.metadata.outputs.raw }}"
```

`data` contains only the array of data that was sent to Metadatum. `raw` contains the full objects, which has additional    
metadata from the OIDC token. Commit SHAs, event types, actors, etc