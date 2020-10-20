interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  markerContent(): string;
}

export class CustomMap {
  private gooleMap: google.maps.Map;

  constructor(divId: string) {
    this.gooleMap = new google.maps.Map(document.getElementById(divId), {
      zoom: 1,
      center: { lat: 0, lng: 0 },
    });
  }

  addMarker(mappable: Mappable): void {
    const marker = new google.maps.Marker({
      map: this.gooleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng,
      },
    });

    const infoWindow = new google.maps.InfoWindow({
      content: mappable.markerContent(),
    });

    marker.addListener('click', () => {
      infoWindow.open(this.gooleMap, marker);
    });
  }
}
