import { Body, Controller, Get, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { QuotationService } from './quotation.service';
import { documentsDto, QuotationFormDto, QuotationListDto } from './dto/create-quotation.dto';
import { ApiBody } from '@nestjs/swagger';
import { saveDocumentDetails } from '../authentication/sample/user.sample';
import { saveQuotationFormData, saveQuotationListData } from './sample/quotation.sample';



@Controller('quotation')
export class QuotationController {

       constructor(
            private readonly quotationService: QuotationService,  
          ) { }
    
      @Get("get-quotation-form-data")
      async getQuotationFormData(@Query("quotation_id") quotation_id:number):Promise<any>  {
        return await this.quotationService.getQuotationFormData(quotation_id)
      }
      @Get("get-quotation-form-history")
      async getQuotationFormHistory():Promise<any>  {
        return  await this.quotationService.getQuotationFormHistory()
      }

      @Get("generate-dynamic-doc-number")
      async generateDynamicDocNumber(@Query('doc_type') doc_type:string):Promise<any> {
        return this.quotationService.generateDynamicDocNumber(doc_type)
      }
      
      @Get("get-single-quotation-list")
      async getSingleQuotationList(@Query('record_id') record_id:number):Promise<any> {
        return this.quotationService.getSingleQuotationList(record_id)
      }

      @ApiBody({
        schema: {
          type: 'array'
        },
        examples: {
          example: {
            value: saveQuotationListData
          }
        }
    
      })
      @Post("get-and-save-quotation-list")
      async getAndSaveQuotationList(@Body() data:{doc_number:string,Quotation_list:QuotationListDto[],record_id?:number} ) :Promise<any> {
        return this.quotationService.getAndSaveQuotationList(data.doc_number,data.Quotation_list,data.record_id)
      }

      @ApiBody({
        schema: {
          type: 'array'
        },
        examples: {
          example: {
            value: saveQuotationFormData
          }
        }
    
      })
      @Post("create-quotation-form")
      async createQuotationForm(@Body() QuotationForm:QuotationFormDto) :Promise<any> {
        return this.quotationService.createQuotationForm(QuotationForm)
      }

      @ApiBody({
        schema: {
          type: 'array'
        },
        examples: {
          example: {
            value: saveQuotationFormData
          }
        }
    
      })
      @Patch("update-quotation-form/:id")
      async updateQuotationForm(@Param('id')id :number,@Body() QuotationForm:QuotationFormDto) {
        return this.quotationService.updateQuotationForm(id,QuotationForm)
      }
      
      @ApiBody({
          schema: {
            type: 'array'
          },
          examples: {
            example: {
              value: saveDocumentDetails
            }
          }
      
        })
      @Post("create-or-update-document")
      async createOrUpdateDocument(@Body() documentsDto:documentsDto[]) {
        return this.quotationService.createOrUpdateDocument(documentsDto)
      }

     
      @Get("generate-quotation-template")
      async generateQuotationTemplate(  @Res() res:Response,@Query('id') id :number) {
        return this.quotationService.generateQuotationTemplate(res,id)
      }
}
