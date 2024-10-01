import { CrochetRepository} from "../../../application/repositories/crochet-repository";
import { Crochet } from "../../../domain/crochet";
import { CrochetModel } from "./model";

export class Repository implements CrochetRepository {
    async save (crochet: Crochet): Promise<void> {
        const newCrochet = new CrochetModel(crochet);
        await newCrochet.save();
    }
    
    async findAll (): Promise<Array<Crochet>> {
        const crochets = await CrochetModel.find();

        const translatedCrochets = crochets.map(item => {
            return {
                id: item._id.toString(),
                created_at: item.created_at,
                fio: item.fio,
                tex: item.tex,
                composicao: item.composicao,
                comprimento: item.comprimento,
                peso: item.peso,
                agulha_croche_minimo: item.agulha_croche_minimo,
                agulha_croche_maximo: item.agulha_croche_maximo,
                agulha_trico_minimo: item.agulha_trico_minimo,
                agulha_trico_maximo: item.agulha_trico_maximo,
                quantidade_cores: item.quantidade_cores,
                malha_rendimento_dimensao: item.malha_rendimento_dimensao,
                malha_rendimento_agulha_trico: item.malha_rendimento_agulha_trico,
                status: item.status
            }
        }) as Array<Crochet>;

        return translatedCrochets;
    }
    
    async update(id: string, params: Partial<Crochet>): Promise<Crochet | null> {
        const updatedCrochet = await CrochetModel.findByIdAndUpdate(id, params, { new: true });
        if (updatedCrochet) {
            return {
                id: updatedCrochet._id.toString(),
                created_at: updatedCrochet.created_at,
                fio: updatedCrochet.fio,
                tex: updatedCrochet.tex,
                composicao: updatedCrochet.composicao,
                comprimento: updatedCrochet.comprimento,
                peso: updatedCrochet.peso,
                agulha_croche_minimo: updatedCrochet.agulha_croche_minimo,
                agulha_croche_maximo: updatedCrochet.agulha_croche_maximo,
                agulha_trico_minimo: updatedCrochet.agulha_trico_minimo,
                agulha_trico_maximo: updatedCrochet.agulha_trico_maximo,
                quantidade_cores: updatedCrochet.quantidade_cores,
                malha_rendimento_dimensao: updatedCrochet.malha_rendimento_dimensao,
                malha_rendimento_agulha_trico: updatedCrochet.malha_rendimento_agulha_trico,
                status: updatedCrochet.status as "available" | "unavailable" | undefined
            } as Crochet;
        }
        return null;
    }

    async delete(id: string): Promise<void> {
        await CrochetModel.findByIdAndDelete(id);
    }
}
   