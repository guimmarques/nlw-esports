import * as Checkbox from "@radix-ui/react-checkbox";
import * as Dialog from "@radix-ui/react-dialog";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Check, GameController } from "phosphor-react";
import { EventHandler, FormEvent, useEffect, useState } from "react";
import { Input } from "./Form/Input";
import { SelectComp } from "./Form/Select";
import axios from "axios";

export interface Game {
  id: string;
  name: string;
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);

  useEffect(() => {
    axios.get("http://localhost:3333/games").then((response) => {
      const newData = response.data.map((game: any) => {
        return {
          id: game.id,
          name: game.title,
        };
      });
      setGames(newData);
    });
  }, []);

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();
    try {
      const formData = new FormData(event.target as HTMLFormElement);
      const data = Object.fromEntries(formData);

      const { game, ...rest } = data;
      const newData = {
        ...rest,
        yearsPlaying: Number(rest.yearsPlaying),
        weekDays: weekDays.map(Number),
        useVoiceChannel: useVoiceChannel,
      };

      await axios.post(`http://localhost:3333/games/${game}/ads`, newData);

      alert("Anúncio criado com sucesso!");
    } catch (err) {
      alert("Erro ao criar o anúncio!");
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-3xl font-black">
          Publique um anúncio
        </Dialog.Title>
        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>
            <SelectComp
              name="game"
              placeholder="Selecione o game que deseja jogar"
              items={games}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-semibold">
              Seu nome (ou nickname)
            </label>
            <Input
              name="name"
              id="name"
              placeholder="Como te chamam dentro do game?"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying" className="font-semibold">
                Joga a quantos anos?
              </label>
              <Input
                name="yearsPlaying"
                id="yearsPlaying"
                type="number"
                placeholder="Tudo bem ser ZERO"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="discord" className="font-semibold">
                Qual seu Discord?
              </label>
              <Input
                name="discord"
                id="discord"
                type="text"
                placeholder="Usuario#0000"
              />
            </div>
          </div>

          <div className="flex flex-row gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays" className="font-semibold">
                Quando costuma jogar?
              </label>
              <div>
                <ToggleGroup.Root
                  type="multiple"
                  className="grid grid-cols-4 gap-2"
                  value={weekDays}
                  onValueChange={setWeekDays}
                >
                  <ToggleGroup.Item
                    value="0"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                    title="Domingo"
                  >
                    D
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="1"
                    className={`w-8 h-8 rounded  ${
                      weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                    title="Segunda"
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="2"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                    title="Terça"
                  >
                    T
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="3"
                    className={`w-8 h-8 rounded  ${
                      weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                    title="Quarta"
                  >
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="4"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                    title="Quinta"
                  >
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="5"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                    title="Sexta"
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="6"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                    title="Sabado"
                  >
                    S
                  </ToggleGroup.Item>
                </ToggleGroup.Root>
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart" className="font-semibold">
                Qual horário do dia?
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  name="hourStart"
                  id="hourStart"
                  type="time"
                  placeholder="De"
                />
                <Input
                  name="hourEnd"
                  id="hourEnd"
                  type="time"
                  placeholder="Até"
                />
              </div>
            </div>
          </div>

          <label className="mt-2 flex gap-2 text-sm items-center">
            <Checkbox.Root
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setUseVoiceChannel(true);
                } else {
                  setUseVoiceChannel(false);
                }
              }}
              checked={useVoiceChannel}
              className="w-6 h-6 rounded bg-zinc-900 p-1"
            >
              <Checkbox.Indicator>
                <Check size={16} className="text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
              Cancelar
            </Dialog.Close>
            <button
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
              type="submit"
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
