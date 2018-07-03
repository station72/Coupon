import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import "bootstrap";
import Cropper from "cropperjs";
import * as $ from "jquery";
import { BsLocaleService } from "ngx-bootstrap";
import { defineLocale } from "ngx-bootstrap/chronos";
import { ruLocale } from "ngx-bootstrap/locale";
import { ProductsFormFactoryService } from "src/app/modules/products/services/products-form-factory.service";
import { ProductsService } from "src/app/modules/products/services/products.service";
import { BaseFormComponent } from "src/app/shared/components/base-form.component";
import { BadInputErrorsService } from "src/app/shared/services/bad-input-errors.service";
import { ContentService } from "src/app/shared/services/content.service";
(<any>window).jQuery = $;

defineLocale("ru", ruLocale);

@Component({
  selector: "app-products-create",
  templateUrl: "./products-create.component.html",
  styleUrls: ["./products-create.component.css"]
})
export class ProductsCreateComponent extends BaseFormComponent
  implements OnInit {
  public loading = false;
  public cropper: Cropper;

  @ViewChild("cropImg") private cropImg: ElementRef;
  @ViewChild("mainImage") private mainImage: ElementRef;
  @ViewChild("mainImageFileInput") private mainImageFileInput: ElementRef;

  constructor(
    formFactory: ProductsFormFactoryService,
    badInput: BadInputErrorsService,
    private productsService: ProductsService,
    private router: Router,
    private localeService: BsLocaleService,
    private contentService: ContentService
  ) {
    super(formFactory, badInput);
    this.createForm();
    this.form.get("startAvailableCount").setValue(1);
  }

  ngOnInit(): void {
    this.localeService.use("ru");
  }

  onFileChanged(e) {
    const files = e.target.files;
    let file: File;

    if (files && files.length > 0) {
      file = files[0];
    } else {
      return;
    }

    var filename = file.name.replace(/^.*[\\\/]/, "");
    if (!this.fileHasValidExtension(filename)) {
      alert("Допустимый формат - jpg, jpeg, bmp, png");
      return;
    }
    this._fileName = filename;

    const reader = new FileReader();
    reader.onload = e => this.onLoadFile(reader.result);
    reader.readAsDataURL(file);
  }
  private _fileName: string;
  fileHasValidExtension(fileName: string): boolean {
    if (!fileName) {
      return false;
    }

    const ext = this.getFileExtension(fileName);
    const exttensions = ["bmp", "jpg", "jpeg", "png"];
    return exttensions.includes(ext);
  }

  getFileExtension(fileName: string): string {
    const re = /(?:\.([^.]+))?$/;
    const ext = re.exec(fileName)[1];
    return ext;
  }

  onLoadFile(url) {
    const $cropModal = $("#cropModal");

    this.cropImg.nativeElement.src = url;
    this.cropper = new Cropper(this.cropImg.nativeElement, {
      aspectRatio: 16 / 9,
      viewMode: 1,
      zoomable: true
    });

    $cropModal.modal({
      show: true,
      backdrop: false
    });
  }

  cancelCrop() {
    this.hideCropper();
  }

  onSaveCropper() {
    const canvas = this.cropper.getCroppedCanvas({});
    canvas.toBlob(this.sendCroppedToServer.bind(this));
  }

  sendCroppedToServer(blob) {
    var formData = new FormData();
    formData.append("file", blob, this._fileName);

    this.contentService.uploadImage(formData).subscribe(
      image => {
        debugger;
        this.form.get("mainImageId").setValue(image.id);
        this.hideCropper();
        this.mainImage.nativeElement.src = "http://" + image.originalPath;
      },
      error => {
        this.hideCropper();
        this.showServerErrors(error);
      }
    );
  }

  hideCropper() {
    this.cropper.destroy();
    $("#cropModal").modal("hide");
    this.mainImageFileInput.nativeElement.value = "";
  }

  getControlNames(): string[] {
    return [
      "title",
      "fullTitle",
      "validFrom",
      "validUntil",
      "conditions",
      "description",
      "oldPrice",
      "newPrice",
      "startAvailableCount",
      "mainImageId"
    ];
  }

  onSubmit() {
    this.submitClicked = true;
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.productsService.create(this.form.getRawValue()).subscribe(
      result => {
        this.loading = false;
        this.router.navigate(["/products"]);
      },
      error => {
        this.loading = false;
        this.showServerErrors(error);
      }
    );
  }

  onDateRangeChange(range) {
    const from = range[0] as Date;
    const until = range[1] as Date;
    this.form.get("validFrom").setValue(from.toISOString());
    this.form.get("validUntil").setValue(until.toISOString());
  }

  getDatePickerConfig() //  : BsDaterangepickerConfig
  {
    return {
      minDate: new Date(),
      rangeInputFormat: "YYYY-MM-DD"
    };
  }

  oldPriceChanged(newValue) {
    this.form.get("oldPrice").setValue(newValue);
  }

  newPriceChanged(newValue) {
    this.form.get("newPrice").setValue(newValue);
  }

  startAvailableCountChanged(newValue) {
    this.form.get("startAvailableCount").setValue(newValue);
  }
}
