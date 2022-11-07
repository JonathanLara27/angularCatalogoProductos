export class Product{
    constructor(
  public _id: string,
  //principal
  public nombre: string,
  public descripcion: string,
  public categoria: string,
  public precio: number,
  public stock: number,
  public imagen: string,
  //general
  public color: string,
  public ram: number,
  public rom: number,
  public pantalla: number,
  public resolucion: string,
  public bateria: number,
  public camaraf: string,
  public camarap: string,
  public marca: string,
  //especifico
  public modeloproducto: string,
  public tipopantalla: string,
  public tipoentrada: string,
  public sistemaoperativo: string,
  public procesador: string,
  public peso: number,
  //medidas
  public alto: number,
  public ancho: number,
  public profundidad: number
    ){}
}
